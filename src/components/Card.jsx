function Card({ title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors">
      <h3 className="text-xl font-semibold mb-3 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

export default Card;