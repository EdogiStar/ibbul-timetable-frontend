import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Levels() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Levels"
        subtitle="Manage academic levels across all programmes."
      />

      <ComingSoon
        title="Levels Module Coming Soon"
        description="This module will enable administrators to define and manage academic levels such as 100 Level through 500 Level, ensuring proper course allocation and timetable organization."
      />
    </div>
  );
}

export default Levels;