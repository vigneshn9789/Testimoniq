import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Content */}
            <div className="md:w-1/2">
              <h1 className="text-5xl font-bold mb-6">Collect Testimonials Effortlessly</h1>
              <p className="text-xl text-justify mb-8">
                Our platform allows you to gather customer feedback with ease, helping you
                build trust and improve your products.
              </p>
              <a
                href="/signup"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
              >
                Get Started
              </a>
            </div>
            {/* Image */}
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <img
                src="/startup.jpg" // Replace with your actual image URL
                alt="Collect Testimonials"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Platform?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-xl rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Create Products</h3>
              <p className="text-gray-600 text-justify leading-relaxed">
                Easily create products with all the essential details like product name,
                description, and images. Generate a unique link to gather testimonials.
              </p>
            </div>

            <div className="bg-white p-8 shadow-xl rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Collect Testimonials</h3>
              <p className="text-gray-600 text-justify leading-relaxed">
                Customers can provide their name, email, rating, and review text via a
                dedicated testimonial form. It’s simple and quick.
              </p>
            </div>

            <div className="bg-white p-8 shadow-xl rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Feedback</h3>
              <p className="text-gray-600 text-justify leading-relaxed">
                View collected testimonials on the product detail page and showcase them
                to enhance your credibility and reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Sign up now and start collecting testimonials for your products today!
          </p>
          <a
            href="/signup"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Footer Section */}
     
    </div>
  );
}

export default HomePage;
