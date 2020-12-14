const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default (date) => new Date(date).toLocaleDateString(undefined, options);
