import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ExportTestimonialsJSONButton({ pid }) {
    const handleExportJSON = async () => {
        try {
            // Fetch the testimonials JSON from the server
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/gettestimonial?pid=${pid}`);

            // Convert the response data (JSON) into a Blob object for download
            const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
            
            // Create a download link and click it to download the file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'testimonials.json');  // File name
            document.body.appendChild(link);
            link.click();

            // Cleanup: remove the link element
            document.body.removeChild(link);
            toast.success('Testimonial JSON file downloaded', { position: 'top-center' });

        } catch (error) {
            console.error('Error exporting testimonials as JSON:', error);
            // alert('Failed to export testimonials.');
            toast.error('Failed to export testimonials', { position: 'top-center' });

        }
    };

    return (
        <div className="mt-6 flex flex-col items-center">
      {/* Hook line */}
      <h2 className="text-xl font-semibold mb-2 text-blue-600 text-center">
        Take your customer stories with you—download your testimonials now!
      </h2>

      {/* Highlighted Download Button */}
      <button
        onClick={handleExportJSON}
        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 text-lg"
      >
        Export as JSON
      </button>
    </div>
    );
}

export default ExportTestimonialsJSONButton;
