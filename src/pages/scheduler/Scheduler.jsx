import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Scheduler() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Scheduler"
        subtitle="Generate and manage academic timetables."
      />

      <ComingSoon
        title="Scheduler Module Coming Soon"
        description="This module will provide intelligent timetable scheduling by automatically assigning courses, lecturers, venues and time slots while minimizing scheduling conflicts."
      />
    </div>
  );
}

export default Scheduler;