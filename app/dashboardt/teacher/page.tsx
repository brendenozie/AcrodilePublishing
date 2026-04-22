"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui";
import courseService, { Course } from "@/services/courseService";
import assignmentService, {
  Assignment,
  Submission,
} from "@/services/assignmentService";
import analyticsService from "@/services/analyticsService";
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
  time_ago: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function greetingFor(name: string) {
  const h = new Date().getHours();
  const part =
    h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return `${part}, ${name.split(" ")[0]} 👋`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function statusColor(s: string) {
  if (s === "published") return "bg-green-100 text-green-700";
  if (s === "draft") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-500";
}

function diffColor(d: string) {
  if (d === "beginner") return "bg-green-50 text-green-700";
  if (d === "intermediate") return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
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
    system: "⚙️",
    message: "💬",
  };
  return map[type] ?? "🔔";
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  href,
  accent,
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  href: string;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-orange-200 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p
            className={`text-3xl font-bold group-hover:text-orange-600 transition-colors ${accent ?? "text-gray-900"}`}
          >
            {value}
          </p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>(
    [],
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      try {
        const dashboardData = await analyticsService.getTeacherDashboardSummary();
        if (cancelled) return;

        setCourses(
          dashboardData.courses.map((c) => ({
            id: c.id,
            title: c.title,
            slug: c.slug,
            status: c.status,
            enrolled_count: c.student_count,
          })) as Course[],
        );

        setPendingSubmissions(
          dashboardData.pending_submissions.map((s) => ({
            id: s.id,
            assignment: s.assignment_id,
            student: s.student_id,
            student_name: s.student_name,
            student_email: s.student_email,
            status: "submitted" as const,
            text_response: "",
            submitted_at: s.submitted_at,
            files: [],
            grade: undefined,
          })),
        );

        const notifs = await api
          .getList<Notification>("/notifications/recent/")
          .catch(() => []);
        if (!cancelled) setNotifications(notifs);
      } catch (e) {
        console.error("Dashboard load error: ", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadAll();
    return () => { cancelled = true; };
  }, [user]);

  async function loadAll() {
    setLoading(true);
    try {
      // Single API call — backend handles all the aggregation efficiently
      const dashboardData = await analyticsService.getTeacherDashboardSummary();

      // Map to local state shapes
      setCourses(
        dashboardData.courses.map((c) => ({
          id: c.id,
          title: c.title,
          slug: c.slug,
          status: c.status,
          enrolled_count: c.student_count,
        })) as Course[],
      );

      // pending_submissions from backend already filtered to status='submitted'
      setPendingSubmissions(
        dashboardData.pending_submissions.map((s) => ({
          id: s.id,
          assignment: s.assignment_id,
          student: s.student_id,
          student_name: s.student_name,
          student_email: s.student_email,
          status: "submitted" as const,
          text_response: "",
          submitted_at: s.submitted_at,
          files: [],
          grade: undefined,
        })),
      );

      const notifs = await api
        .getList<Notification>("/notifications/recent/")
        .catch(() => []);
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

  // Derived stats
  const publishedCourses = courses.filter((c) => c.status === "published");
  const draftCourses = courses.filter((c) => c.status === "draft");
  const totalStudents = courses.reduce(
    (s, c) => s + (c.enrolled_count ?? 0),
    0,
  );
  const unreadNotifs = notifications.filter((n) => !n.is_read);

  return (
    <div className="space-y-8">
      {/* ── Greeting ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greetingFor(user?.first_name || user?.username || "there")}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {courses.length === 0
              ? "Create your first course to get started."
              : `You're teaching ${publishedCourses.length} published course${publishedCourses.length !== 1 ? "s" : ""}.`}
          </p>
        </div>
        <Link
          href="/courses/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + New Course
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="📚"
          label="Published"
          value={publishedCourses.length}
          sub="live courses"
          href="/courses"
        />
        <StatCard
          icon="✏️"
          label="Drafts"
          value={draftCourses.length}
          sub="in progress"
          href="/courses"
        />
        <StatCard
          icon="👥"
          label="Students"
          value={totalStudents}
          sub="total enrolled"
          href="/courses"
        />
        <StatCard
          icon="📬"
          label="To Grade"
          value={pendingSubmissions.length}
          sub="awaiting review"
          href="/assignments"
          accent={pendingSubmissions.length > 0 ? "text-amber-600" : undefined}
        />
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: My Courses (2/3) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              My Courses
            </h2>
            <div className="flex items-center gap-3">
              <Link
                href="/courses/new"
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                + New
              </Link>
              <Link
                href="/courses"
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 p-12 text-center">
              <span className="text-5xl block mb-3">📚</span>
              <p className="font-semibold text-gray-700 mb-1">No courses yet</p>
              <p className="text-sm text-gray-400 mb-4">
                Create your first course to start teaching.
              </p>
              <Link
                href="/courses/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Create Course
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
              {courses.slice(0, 6).map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
                >
                  {course.cover_image ? (
                    <img
                      src={course.cover_image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 text-lg">
                      📚
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded capitalize ${statusColor(course.status)}`}
                      >
                        {course.status}
                      </span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded capitalize ${diffColor(course.difficulty)}`}
                      >
                        {course.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {course.enrolled_count ?? 0}
                    </p>
                    <p className="text-xs text-gray-400">students</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pending submissions */}
          {pendingSubmissions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  📬 Pending Grading
                  <span className="text-xs bg-amber-500 text-white rounded-full px-1.5 py-0.5 font-bold">
                    {pendingSubmissions.length}
                  </span>
                </h2>
                <Link
                  href="/assignments"
                  className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                >
                  View all →
                </Link>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                {pendingSubmissions.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/assignments/${sub.assignment}/grade`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-amber-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm shrink-0 font-semibold text-gray-600">
                      {sub.student_name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {sub.student_name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Submitted {formatDate(sub.submitted_at)}
                      </p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                      Grade →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Notifications + Assignments (1/3) */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                🔔 Notifications
                {unreadNotifs.length > 0 && (
                  <span className="text-xs bg-orange-500 text-white rounded-full px-1.5 py-0.5 font-bold">
                    {unreadNotifs.length}
                  </span>
                )}
              </h2>
              <Link
                href="/notifications"
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                See all →
              </Link>
            </div>

            {notifications.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-gray-400">You're all caught up ✓</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.slice(0, 4).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      markNotifRead(n.id);
                      if (n.action_url) router.push(n.action_url);
                    }}
                    className={`w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors ${
                      !n.is_read ? "bg-orange-50/40" : ""
                    }`}
                  >
                    <span className="text-lg shrink-0 mt-0.5">
                      {notifIcon(n.notification_type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm leading-snug line-clamp-2 ${!n.is_read ? "font-medium text-gray-900" : "text-gray-600"}`}
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
            )}
          </div>

          {/* Recent Assignments */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                📝 Assignments
              </h2>
              <Link
                href="/assignments"
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                See all →
              </Link>
            </div>

            {assignments.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-gray-400">No assignments yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {assignments.slice(0, 5).map((a) => (
                  <Link
                    key={a.id}
                    href={`/assignments/${a.id}`}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {a.course_title}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded capitalize shrink-0 ${
                        a.status === "published"
                          ? "bg-green-100 text-green-700"
                          : a.status === "closed"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Quick Links ── */}
      {/* <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "New Course",
              href: "/courses/new",
              icon: "➕",
              color: "bg-orange-50 border-orange-100 hover:border-orange-300",
            },
            {
              label: "My Courses",
              href: "/courses",
              icon: "📚",
              color: "bg-blue-50 border-blue-100 hover:border-blue-300",
            },
            {
              label: "Assignments",
              href: "/assignments",
              icon: "📝",
              color: "bg-green-50 border-green-100 hover:border-green-300",
            },
            {
              label: "Notifications",
              href: "/notifications",
              icon: "🔔",
              color: "bg-amber-50 border-amber-100 hover:border-amber-300",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${link.color}`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
}
