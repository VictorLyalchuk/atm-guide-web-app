import { ClockIcon, DocumentChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { APP_ENV } from '../env/config'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import classNames from 'classnames';
import { IAuthReducerState } from '../store/accounts/AuthReducer'



export default function AdminPanelPage() {
  const baseUrl = APP_ENV.BASE_URL;
  const { user } = useSelector((redux: any) => redux.auth as IAuthReducerState);
  // const stepQuick = [0];
  // const page = 1;
  // const itemsPerPage = 3;
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);


  const stats = [
    { label: 'Інструкцій в базі даних', value: productsCount },
    { label: 'Типових проблем в базі даних', value: ordersCount },
    { label: 'Кодів з помилками в базі даних', value: usersCount },
  ]

  const actions = [
    {
      id: 1,
      icon: DocumentChartBarIcon,
      name: 'Список користувачів',
      href: '/admin/user/user-list',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
      descriptions: 'Опис',
    },
    {
      id: 2,
      icon: DocumentChartBarIcon,
      name: 'Інструкції до банкоматів',
      href: '/admin/instruction/instruction-list',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
      descriptions: 'Опис',
    },
    {
      id: 3,
      icon: ClockIcon,
      name: 'Типові проблеми з банкоматами',
      href: '/admin/issue/issue-list',
      iconForeground: 'text-orange-700',
      iconBackground: 'bg-orange-50',
      descriptions: 'Опис',
    },
    {
      id: 4,
      icon: RocketLaunchIcon,
      name: 'Коди з помилками для банкоматів',
      href: '/admin/error-code/error-code-list',
      iconForeground: 'text-blue-700',
      iconBackground: 'bg-blue-50',
      descriptions: 'Опис',
    },

  ]

  // useEffect(() => {
  //   getProductQuantity('')
  //     .then(data => setProductsCount(data))
  //     .catch(error => console.error('Error fetching product quantity data:', error));
  //   getUsersQuantity()
  //     .then(data => setUsersCount(data))
  //     .catch(error => console.error('Error fetching user quantity data:', error));
  //   getOrderQuantity(step).then(data => setOrdersCount(data))
  //     .catch(error => console.error('Error fetching orders quantity data:', error));
  //   getOrdersByPage(page, itemsPerPage, stepQuick).then(data => setOrderItems(data)).then(() => {
  //     setLoading(false);
  //   }).catch(error => console.error('Error fetching orders data:', error));
  //   getReviewByPage(page, itemsPerPage).then(data => setReviewItems(data)).then(() => {
  //     setLoading(false);
  //   }).catch(error => console.error('Error fetching Review data:', error));
  // }, []);



  return (
    <>
      <div className="min-h-full">
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
            <h1 className="sr-only">{'Admin_Profile'}</h1>
            {/* Main 3 column grid */}
            <div className="items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      {'Admin_Profile_Overview'}
                    </h2>
                    <div className="bg-white p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="flex-shrink-0">
                            <img className="mx-auto h-20 w-20 rounded-full" src={`${baseUrl}/uploads/${user?.ImagePath || "user404.webp"}`} alt="" />
                          </div>
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600">{'Ласкаво просимо додому'}</p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.FirstName} {user?.LastName}</p>
                            <p className="text-sm font-medium text-gray-600">{user?.Roles}</p>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      {stats.map((stat) => (
                        <div key={stat.label} className="px-6 py-5 text-center text-sm font-medium">
                          <span className="text-gray-900">{stat.value}</span>{' '}
                          <span className="text-gray-600">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Actions panel */}
                <section aria-labelledby="quick-links-title">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-gray-700 mx-auto max-w-7xl  ">
                    <h2 className="sr-only" id="quick-links-title">
                      {'Admin_Quick_links'}
                    </h2>
                    {actions.map((action, actionIdx) => (
                      <div
                        key={action.id}
                        className={classNames(
                          'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-100 hover:text-indigo-500 transform transition-transform duration-300 hover:scale-105',
                          actionIdx % 2 === 0 ? 'hover:z-20' : 'hover:z-10',
                          'rounded-md p-6 shadow-md'
                        )}
                      >
                        <div>
                          <span
                            className={classNames(
                              action.iconBackground,
                              action.iconForeground,
                              'inline-flex rounded-lg p-3 ring-4 ring-white'
                            )}
                          >
                            <action.icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="mt-8">
                          <h3 className="text-lg font-medium">
                            <Link to={action.href} className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span className="absolute inset-0" aria-hidden="true" />
                              {action.name}
                            </Link>
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            {action.descriptions}
                          </p>
                        </div>
                        <span
                          className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}