function RegisterForm() {
  // const [formData, setFormData] = useState({
  //   bio: '',
  //   uid: user.uid,
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   registerUser(formData).then(() => updateUser(user.uid));
  // };

  return (
    <>
      <h1>To view products and start shopping, please sign in/register</h1>
      {/* <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gamer Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Let other gamers know a little bit about you...</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> */}
    </>
  );
}

// RegisterForm.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string.isRequired,
//   }).isRequired,
//   updateUser: PropTypes.func.isRequired,
// };

export default RegisterForm;
