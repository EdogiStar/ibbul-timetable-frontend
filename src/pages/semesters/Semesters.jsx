import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Semesters() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Semesters"
        subtitle="Manage academic semesters within each session."
      />

      <ComingSoon
        title="Semesters Module Coming Soon"
        description="This module will enable administrators to create and manage academic semesters, such as First and Second Semester, ensuring accurate course scheduling and timetable generation."
      />
    </div>
  );
}

export default Semesters;