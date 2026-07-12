import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Programmes() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Programmes"
        subtitle="Manage academic programmes offered by each department."
      />

      <ComingSoon
        title="Programmes Module Coming Soon"
        description="This module will enable administrators to create, update and manage academic programmes for each department, supporting programme structures, course offerings and timetable scheduling."
      />
    </div>
  );
}

export default Programmes;