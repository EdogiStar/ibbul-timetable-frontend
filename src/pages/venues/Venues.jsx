import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Venues() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Venues"
        subtitle="Manage lecture halls, classrooms and examination venues."
      />

      <ComingSoon
        title="Venues Module Coming Soon"
        description="This module will enable administrators to create and manage lecture venues, including classrooms, lecture theatres and laboratories, helping prevent venue conflicts during timetable scheduling."
      />
    </div>
  );
}

export default Venues;