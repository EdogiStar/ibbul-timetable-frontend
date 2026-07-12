import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Reports() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Reports"
        subtitle="Generate and export academic scheduling reports."
      />

      <ComingSoon
        title="Reports Module Coming Soon"
        description="This module will enable administrators to generate, view and export reports on timetables, faculties, departments, lecturers, courses and venue utilization to support planning and decision-making."
      />
    </div>
  );
}

export default Reports;