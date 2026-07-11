function PageLoader({
  text = "Loading..."
}) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>

        <p className="text-sm text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}

export default PageLoader;