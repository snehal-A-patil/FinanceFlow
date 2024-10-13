

const Features = () => {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div className="mb-4">
                <img src="client\src\assets\Exp.png" alt="Expense Tracking" className="mx-auto h-16" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p>Track your daily spending and categorize your expenses easily.</p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div className="mb-4">
                <img src="path/to/icon2.png" alt="Financial Goals" className="mx-auto h-16" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Goals</h3>
              <p>Set savings goals and track your progress towards them.</p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div className="mb-4">
                <img src="path/to/icon3.png" alt="Budget Management" className="mx-auto h-16" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Management</h3>
              <p>Create and manage your monthly budgets effortlessly.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  