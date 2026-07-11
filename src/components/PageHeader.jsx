function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-green-600">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;