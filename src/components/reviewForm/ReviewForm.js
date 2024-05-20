import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (revText.current.value.trim() !== '') {
      handleSubmit(e);
    } else {
      alert('Please enter your review before submitting.');
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleFormSubmit}>
      <div className="mb-3" controlId="exampleForm.ControlTextarea1">
        <label className="block mb-2 text-xl text-white text-center">{labelText}</label>
        <textarea
          ref={revText}
          rows={3}
          defaultValue={defaultValue}
          className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        Submit
      </button>
    </form>

  );
};

export default ReviewForm;
