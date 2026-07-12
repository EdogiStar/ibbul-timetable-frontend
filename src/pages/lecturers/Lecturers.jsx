import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Lecturers() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Lecturers"
        subtitle="Manage lecturer profiles and academic assignments."
      />

      <ComingSoon
        title="Lecturers Module Coming Soon"
        description="This module will enable administrators to manage lecturer profiles, departmental affiliations, teaching workloads and course allocations, supporting efficient timetable scheduling."
      />
    </div>
  );
}

export default Lecturers;