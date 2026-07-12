import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Timetables() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Timetables"
        subtitle="Create, manage and publish academic timetables."
      />

      <ComingSoon
        title="Timetable Module Coming Soon"
        description="This module will enable administrators to generate, manage and publish conflict-free academic timetables by assigning courses, lecturers, venues and time slots across all faculties and departments."
      />
    </div>
  );
}

export default Timetables;