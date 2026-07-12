import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function CourseAllocation() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Course Allocation"
        subtitle="Assign lecturers to courses for each academic session."
      />

      <ComingSoon
        title="Course Allocation Module Coming Soon"
        description="This module will enable administrators to allocate lecturers to course offerings, manage teaching workloads and prepare course assignments for timetable generation."
      />
    </div>
  );
}

export default CourseAllocation;