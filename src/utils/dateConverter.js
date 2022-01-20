const dateConverter = ({ _seconds }) => {
  const d = new Date(Date.UTC(1970, 0, 1));
  d.setSeconds(_seconds);
  return d.toLocaleDateString();
};

export default dateConverter;
