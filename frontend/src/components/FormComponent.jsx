const FormComponent = ({ title, children, onSubmit, submitLabel }) => {
  return (
    <section className="card form-card">
      <h1>{title}</h1>
      <form onSubmit={onSubmit} className="stack">
        {children}
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
      </form>
    </section>
  );
};

export default FormComponent;
