import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function CourseOfferings() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Course Offerings"
        subtitle="Manage courses offered for each academic session and semester."
      />

      <ComingSoon
        title="Course Offerings Module Coming Soon"
        description="This module will enable administrators to assign courses to specific academic sessions, semesters, programmes and levels, ensuring only approved courses are available for timetable scheduling."
      />
    </div>
  );
}

export default CourseOfferings;