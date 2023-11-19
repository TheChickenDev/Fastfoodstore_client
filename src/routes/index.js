import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import Payment from '../pages/Payment';
import UserManagement from '../pages/UserManagement';

const paths = {
    home: '/',
    login: '/sign-in',
    register: '/sign-up',
    menu: '/menu',
    contact: '/contact',
    about: '/about',
    profile: '/user',
    cart: '/cart',
    payment: '/payment',
    userManagement: '/user-management',
};

const routes = [
    {
        path: paths.home,
        component: Home,
        isDefault: true,
    },
    {
        path: paths.login,
        component: Login,
        isDefault: false,
    },
    {
        path: paths.register,
        component: Register,
        isDefault: false,
    },
    {
        path: paths.menu,
        component: Menu,
        isDefault: true,
    },
    {
        path: paths.contact,
        component: Contact,
        isDefault: true,
    },
    {
        path: paths.about,
        component: About,
        isDefault: true,
    },
    {
        path: paths.profile,
        component: Profile,
        isDefault: true,
    },
    {
        path: paths.cart,
        component: Cart,
        isDefault: true,
    },
    {
        path: paths.payment,
        component: Payment,
        isDefault: true,
    },
    {
        path: paths.userManagement,
        component: UserManagement,
        isDefault: true,
    },
];

export { routes, paths };
