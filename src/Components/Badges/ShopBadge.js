const ShopBadge = ({ name, to }) => {
  return (
    <a href={to} target="_blank" className="text-decoration-none text-dark">
      <span class="badge bg-light text-dark">
        <h4>
          <b>{name}</b>
        </h4>
      </span>
    </a>
  );
};
export default ShopBadge;
