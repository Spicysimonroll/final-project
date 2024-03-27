export default function Card({ name, description, price, image }) {
  return (
    <div className="card">
      <div className="card-info">
        <h1 className='title'>{name}</h1>
        <p className='description'>{description}</p>
        <p className='price'>{price}</p>
      </div>
      <img src={image} alt='' />
    </div>
  );
}
