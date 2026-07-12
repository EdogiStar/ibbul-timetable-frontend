import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Profile() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Profile"
        subtitle="View and manage your account information."
      />

      <ComingSoon
        title="Profile Module Coming Soon"
        description="This module will allow users to view and update their personal information, change passwords, manage account preferences and review their assigned roles within the IBBUL Timetable Scheduling System."
      />
    </div>
  );
}

export default Profile;