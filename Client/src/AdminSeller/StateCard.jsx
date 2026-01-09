const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
