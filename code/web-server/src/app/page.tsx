import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/dashboard'); // Or '/login' if that's the default
};

export default HomePage;