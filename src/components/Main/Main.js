import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import saladImage from '../../assets/images/salad.jpg';
import bruschettaImage from '../../assets/images/bruschetta.jpg';
import fishImage from '../../assets/images/fish.jpg';
import pastaImage from '../../assets/images/pasta.jpg';
import dessertImage from '../../assets/images/dessert.jpg';

export default function Main() {
  const dishes = [
    {
      name: 'Greek Salad',
      image: saladImage,
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      price: '$12.99'
    },
    {
      name: 'Bruschetta',
      image: bruschettaImage,
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato, veggies, beans, cured pork, or cheese are examples of variations. In Italy, a brustolina grill is frequently used to create bruschetta.',
      price: '$7.89'
    },
    {
      name: 'Grilled fish',
      image: fishImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.',
      price: '$20.00'
    },
    {
      name: 'Pasta',
      image: pastaImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.',
      price: '$18.99'
    },
    {
      name: 'Lemon dessert',
      image: dessertImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.',
      price: '$6.99'
    }
  ];

  const cardsList = dishes.map(dish => {
    return <Card key={dish.name} name={dish.name} description={dish.description} price={dish.price} image={dish.image} />
  })

  const handleClick = (event) => {
    const button = event.currentTarget;
    const categoryButtons = Array.from(button.parentNode.children);

    categoryButtons.forEach(categoryButton => {
      categoryButton.classList.remove('selected');
    });
    button.classList.add('selected');
  }

  const categories = ['Launch', 'Mains', 'Desserts', 'A La Carte', 'Specials'];
  const categoriesList = categories.map(category => {
    return (
      <Link
        to={{search: `category=${category.toLowerCase()}`}}
        key={category}
        className='btn btn-tertiary'
        onClick={handleClick}
      >
        {category}
      </Link>
    )
  })

  return (
    <main>
      <section id='hero'>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </p>
        <Link to='/reserve-table' className='btn btn-primary'>Reserve a table</Link>
      </section>
      <section className='content'>
        <h2>Order for delivery!</h2>
        <div className='categories'>
          {categoriesList}
        </div>
        <div className='cards'>
          {cardsList}
        </div>
      </section>
    </main>
  )
}
