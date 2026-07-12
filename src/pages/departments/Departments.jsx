import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Departments() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Departments"
        subtitle="Manage academic departments."
      />

      <ComingSoon
        title="Departments Module"
        description="Department management is currently being implemented. This module will allow administrators to create, edit and organize departments under each faculty."
      />
    </div>
  );
}

export default Departments;