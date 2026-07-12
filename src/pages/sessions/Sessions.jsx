import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Sessions() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Sessions"
        subtitle="Manage academic sessions for the university."
      />

      <ComingSoon
        title="Sessions Module Coming Soon"
        description="This module will enable administrators to create, update and manage academic sessions (e.g. 2025/2026), providing the basis for course offerings, timetable scheduling and academic records."
      />
    </div>
  );
}

export default Sessions;