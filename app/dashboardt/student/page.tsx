"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui";
import analyticsService, {
  StudentDashboardData,
} from "@/services/analyticsService";
import api from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Notification {
  id: number;
  notification_type: string;
  title: string;
  message: string;
  priority: "low" | "normal" | "high" | "urgent";
  is_read: boolean;
  action_url?: string;
  action_text?: string;
  time_ago: string;
}

interface LeaderboardEntry {
  rank: number;
  student_name: string;
  avatar?: string;
  points: number;
  is_current_user?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function greetingFor(name: string) {
  const h = new Date().getHours();
  const part =
    h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return `${part}, ${name.split(" ")[0]}`;
}

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function notifIcon(type: string) {
  const map: Record<string, string> = {
    assignment_new: "📝",
    assignment_graded: "✅",
    assignment_due_soon: "⏰",
    course_enrolled: "🎓",
    course_updated: "📚",
    lesson_published: "🆕",
    announcement: "📣",
    certificate_earned: "🏆",
    system: "⚙️",
    message: "💬",
  };
  return map[type] ?? "🔔";
}

// ─── Top Stat Cards ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md hover:border-orange-200 transition-all group"
    >
      <p className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
        {value}
      </p>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </p>
    </Link>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({
  enrollment,
}: {
  enrollment: StudentDashboardData["enrollments"][number];
}) {
  const { course, progress } = enrollment;
  const pct = progress.completion_percentage ?? 0;
  const isComplete = progress.is_completed ?? false;
  const label = isComplete
    ? "100% Completed"
    : pct > 0
      ? `${Math.round(pct)}% Completed`
      : "0% Completed";

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col">
      {/* Cover image */}
      <div className="relative h-36 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
        {course.cover_image ? (
          <img
            src={course.cover_image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-20">📚</span>
          </div>
        )}
        {isComplete && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            ✓ Done
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Title */}
        <p className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug">
          {course.title}
        </p>

        {/* Progress label + bar */}
        <div>
          <p className="text-xs text-gray-400 mb-1.5">{label}</p>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isComplete ? "bg-green-500" : "bg-orange-500"
              }`}
              style={{ width: `${pct > 0 ? Math.max(pct, 4) : 0}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/courses/${course.slug}/learn`}
          className="mt-auto flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors group"
        >
          {isComplete ? "Review Course" : "Continue Learning"}
          <span className="transition-transform group-hover:translate-x-0.5">
            ›
          </span>
        </Link>
      </div>
    </div>
  );
}

// ─── Upcoming Assignment Row ──────────────────────────────────────────────────

function UpcomingAssignmentRow({
  assignment,
}: {
  assignment: StudentDashboardData["upcoming_assignments"][number];
}) {
  const days = daysUntil(assignment.due_date);
  const urgency =
    days <= 1 ? "text-red-500" : days <= 3 ? "text-amber-500" : "text-gray-400";

  return (
    <Link
      href={`/assignments/${assignment.id}`}
      className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-3 px-3 rounded-lg transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-sm">📝</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 line-clamp-1">
          {assignment.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{assignment.course}</p>
      </div>
      <p className={`text-xs font-semibold shrink-0 mt-1 ${urgency}`}>
        {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days}d`}
      </p>
    </Link>
  );
}

// ─── Leaderboard Row ──────────────────────────────────────────────────────────

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className={`flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 ${
        entry.is_current_user ? "bg-orange-50 -mx-3 px-3 rounded-lg" : ""
      }`}
    >
      <span className="w-5 text-center text-sm shrink-0">
        {entry.rank <= 3 ? (
          medals[entry.rank - 1]
        ) : (
          <span className="text-xs text-gray-300 font-medium">
            {entry.rank}
          </span>
        )}
      </span>
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 overflow-hidden">
        {entry.avatar ? (
          <img
            src={entry.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs font-bold text-orange-600">
            {entry.student_name[0]?.toUpperCase()}
          </span>
        )}
      </div>
      <p
        className={`flex-1 text-sm truncate ${
          entry.is_current_user
            ? "font-semibold text-orange-600"
            : "text-gray-700"
        }`}
      >
        {entry.student_name}
        {entry.is_current_user && (
          <span className="text-xs text-orange-400 ml-1">(you)</span>
        )}
      </p>
      <p className="text-sm font-bold text-gray-900 shrink-0">
        {entry.points.toLocaleString()}
        <span className="text-xs font-normal text-gray-400 ml-0.5">pts</span>
      </p>
    </div>
  );
}

// ─── Reusable side panel wrapper ──────────────────────────────────────────────

function SidePanel({
  title,
  href,
  linkLabel,
  empty,
  emptyMessage,
  children,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  empty?: boolean;
  emptyMessage?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {href && linkLabel && (
          <Link
            href={href}
            className="text-xs text-orange-500 hover:text-orange-600 font-medium"
          >
            {linkLabel} →
          </Link>
        )}
      </div>
      <div className="px-4 py-3">
        {empty ? (
          <div className="py-8 text-center">
            <div className="text-3xl mb-2 opacity-20">📭</div>
            <p className="text-sm text-gray-400">
              {emptyMessage ?? "Nothing here yet"}
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StudentDashboardPage() {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] =
    useState<StudentDashboardData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Leaderboard — replace with real API when the endpoint is available
  const [leaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, student_name: "Phoebe W.", points: 35043 },
    { rank: 2, student_name: "Robin K.", points: 28720 },
    { rank: 3, student_name: "Alex M.", points: 24610, is_current_user: true },
    { rank: 4, student_name: "Jordan T.", points: 19880 },
    { rank: 5, student_name: "Sam L.", points: 14350 },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadAll();
  }, [user]);

  async function loadAll() {
    setLoading(true);
    try {
      const [summary, notifs] = await Promise.all([
        analyticsService.getStudentDashboardSummary(),
        api.getList<Notification>("/notifications/recent/").catch(() => []),
      ]);
      setDashboardData(summary);
      setNotifications(notifs);
    } catch (e) {
      console.error("Dashboard load error:", e);
    } finally {
      setLoading(false);
    }
  }

  async function markNotifRead(id: number) {
    await api.post(`/notifications/${id}/mark_read/`).catch(() => {});
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="md" label="Loading your dashboard…" />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-gray-400">
        Failed to load dashboard. Please refresh the page.
      </div>
    );
  }

  const { enrollments, stats, upcoming_assignments } = dashboardData;
  const unreadNotifs = notifications.filter((n) => !n.is_read);

  return (
    <div className="space-y-6">
      {/* ── Greeting ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greetingFor(user?.first_name || user?.username || "there")} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Here's what's happening with your learning today.
          </p>
        </div>
        {unreadNotifs.length > 0 && (
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg">
              🔔
            </div>
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {unreadNotifs.length}
            </span>
          </div>
        )}
      </div>

      {/* ── 3 Stat Cards (mirrors reference: Enrolled / Points / Completed) ── */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Enrolled Modules"
          value={stats.total_courses}
          href="/courses"
        />
        <StatCard label="Points" value="—" href="/dashboard/student" />
        <StatCard
          label="Completed Modules"
          value={stats.completed_courses}
          href="/courses"
        />
      </div>

      {/* ── Main 2-col layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── Left (2/3): Enrolled Modules grid ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Enrolled Modules
            </h2>
            <Link
              href="/courses"
              className="text-xs text-orange-500 hover:text-orange-600 font-medium"
            >
              Browse all →
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3 opacity-20">📚</div>
              <p className="font-semibold text-gray-700 mb-1">No courses yet</p>
              <p className="text-sm text-gray-400 mb-4">
                Browse the catalogue to start learning.
              </p>
              <Link
                href="/courses"
                className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {enrollments.map((enrollment) => (
                <CourseCard
                  key={enrollment.enrollment_id}
                  enrollment={enrollment}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Right (1/3): Stacked side panels ── */}
        <div className="space-y-4">
          {/* Upcoming Assignments — maps to "Upcoming Classes" in the reference */}
          <SidePanel
            title="Upcoming Classes"
            href="/assignments"
            linkLabel="See all"
            empty={upcoming_assignments.length === 0}
            emptyMessage="No Classes Yet"
          >
            {upcoming_assignments.map((a) => (
              <UpcomingAssignmentRow key={a.id} assignment={a} />
            ))}
          </SidePanel>

          {/* Leaderboard */}
          {/* <SidePanel
            title="Leaderboard"
            href="/dashboard/student"
            linkLabel="Full board"
          >
            {leaderboard.map((entry) => (
              <LeaderboardRow key={entry.rank} entry={entry} />
            ))}
          </SidePanel> */}

          {/* Notifications — only shown when there are some */}
          {notifications.length > 0 && (
            <SidePanel
              title={`Notifications${unreadNotifs.length > 0 ? ` (${unreadNotifs.length})` : ""}`}
              href="/notifications"
              linkLabel="See all"
            >
              <div className="space-y-1">
                {notifications.slice(0, 4).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markNotifRead(n.id)}
                    className={`w-full flex items-start gap-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      !n.is_read ? "opacity-100" : "opacity-55"
                    }`}
                  >
                    <span className="text-base shrink-0 mt-0.5">
                      {notifIcon(n.notification_type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs leading-snug line-clamp-2 ${
                          !n.is_read
                            ? "font-semibold text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {n.time_ago}
                      </p>
                    </div>
                    {!n.is_read && (
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    )}
                  </button>
                ))}
              </div>
            </SidePanel>
          )}
        </div>
      </div>
    </div>
  );
}
