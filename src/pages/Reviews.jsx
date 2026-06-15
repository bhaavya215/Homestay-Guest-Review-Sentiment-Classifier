function Reviews() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">
        Reviews
      </h1>

      <p className="text-gray-600 mb-6">
        Sample guest reviews.
      </p>

      <div className="space-y-4">
        <div className="shadow p-4 rounded">
          Amazing stay and excellent hospitality.
        </div>

        <div className="shadow p-4 rounded">
          Good location but rooms need improvement.
        </div>

        <div className="shadow p-4 rounded">
          Fantastic food and friendly staff.
        </div>
      </div>
    </div>
  );
}

export default Reviews;