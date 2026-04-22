"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner, StatusBadge } from "@/components/ui";
import courseService, { type Enrollment } from "@/services/courseService";
import analyticsService, {
  type CourseProgress,
} from "@/services/analyticsService";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudentData {
  enrollments: Enrollment[];
  courseProgress: CourseProgress[];
}

interface TeacherData {
  courses: any[];
}

// ─── Tiny shared helpers ──────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  message,
  action,
}: {
  icon: string;
  title: string;
  message: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="bg-white rounded-lg p-12 text-center border border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-500 mb-4">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

// ─── Student view ─────────────────────────────────────────────────────────────

function StudentDashboard({ data }: { data: StudentData }) {
  const inProgressCount = data.courseProgress.filter(
    (p) => !p.is_completed && p.completion_percentage > 0,
  ).length;

  const completedCount = data.courseProgress.filter(
    (p) => p.is_completed,
  ).length;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Enrolled Courses"
          value={data.enrollments.length}
          icon="📚"
        />
        <StatCard label="In Progress" value={inProgressCount} icon="⏳" />
        <StatCard label="Completed" value={completedCount} icon="✅" />
        <StatCard label="Assignments Due" value="—" icon="📝" />
      </div>

      <section>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📚</span> My Courses
        </h3>
        {data.enrollments.length === 0 ? (
          <EmptyState
            icon="📚"
            title="No courses yet"
            message="Browse the course catalogue to get started."
            action={{ label: "Browse Courses", href: "/courses" }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.enrollments.slice(0, 6).map((enr) => (
              <Link
                key={enr.id}
                href={`/courses/${enr.course.slug}`}
                className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
                    {enr.course.title}
                  </p>
                  <StatusBadge
                    status={
                      enr.completion_percentage === 100 ? "completed" : "active"
                    }
                    className="ml-2"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    {/* FIX: was enr.progress — correct field is enr.completion_percentage */}
                    <span>{enr.completion_percentage ?? 0}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${enr.completion_percentage ?? 0}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Browse Courses", href: "/courses", icon: "📚" },
            { label: "My Assignments", href: "/assignments", icon: "📝" },
            { label: "Certificates", href: "/certificates", icon: "🏆" },
            { label: "My Profile", href: "/profile", icon: "👤" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Teacher view ─────────────────────────────────────────────────────────────

function TeacherDashboard({ data }: { data: TeacherData }) {
  const published = data.courses.filter((c) => c.status === "published").length;
  const drafts = data.courses.filter((c) => c.status === "draft").length;
  const students = data.courses.reduce(
    (s, c) => s + (c.enrolled_count ?? 0),
    0,
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Courses" value={data.courses.length} icon="📚" />
        <StatCard label="Published" value={published} icon="✅" />
        <StatCard label="Drafts" value={drafts} icon="📄" />
        <StatCard label="Total Students" value={students} icon="👥" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span>📚</span> My Courses
          </h3>
          <Link
            href="/courses"
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            View all →
          </Link>
        </div>
        {data.courses.length === 0 ? (
          <EmptyState
            icon="📚"
            title="No courses yet"
            message="Create your first course to start teaching."
            action={{ label: "Create Course", href: "/courses/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.courses.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.slug}`}
                className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                  {c.title}
                </p>
                <p className="text-xs text-gray-400">
                  {c.enrolled_count ?? 0} students
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "New Course", href: "/courses/new", icon: "➕" },
            { label: "Assignments", href: "/assignments", icon: "📝" },
            { label: "My Courses", href: "/courses", icon: "📚" },
            { label: "Edit Profile", href: "/profile", icon: "👤" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingData(true);
      try {
        if (user.role === "student") {
          const [enrollments, courseProgress] = await Promise.all([
            courseService.getMyEnrollments(),
            analyticsService.getMyCourseProgress(),
          ]);
          setStudentData({ enrollments, courseProgress });
        } else {
          const courses = await courseService.getMyCourses();
          setTeacherData({ courses });
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoadingData(false);
      }
    })();
  }, [user]);

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="md" label="Loading your dashboard…" />
      </div>
    );
  }

  if (user?.role === "student" && studentData) {
    return <StudentDashboard data={studentData} />;
  }

  if ((user?.role === "teacher" || user?.role === "admin") && teacherData) {
    return <TeacherDashboard data={teacherData} />;
  }

  return null;
}
