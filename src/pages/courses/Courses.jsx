import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

function Courses() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Courses"
        subtitle="Manage academic courses offered across all faculties and departments."
      />

      <ComingSoon
        title="Courses Module Coming Soon"
        description="This module will enable administrators to create, update, organize and manage courses for each faculty, department, level and semester within Ibrahim Badamasi Babangida University, Lapai."
      />
    </div>
  );
}

export default Courses;