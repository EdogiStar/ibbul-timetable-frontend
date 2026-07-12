import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Users() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Users"
        subtitle="Manage user accounts and access permissions."
      />

      <ComingSoon
        title="Users Module Coming Soon"
        description="This module will enable administrators to create and manage user accounts, assign roles and permissions, and control access to different features of the IBBUL Timetable Scheduling System."
      />
    </div>
  );
}

export default Users;