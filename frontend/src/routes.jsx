import { 
  UserGroupIcon, 
  BuildingStorefrontIcon, 
  PlusCircleIcon, 
  InboxArrowDownIcon, 
  PencilSquareIcon 
} from "@heroicons/react/24/solid";
import { 
  AdviserList,
  AdviserCreate, 
  AdviserEdit, 
  CreateProduct, 
  ProductList,
  OrderList,
  EditOrder
} from "./pages/user/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    userType: "Adviser",
    layout: "adviser",
    pages: [],
  },

  {
    title: "CRUD",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Proveedores",
        path: "/Proveedores",
        isList: true,
        element: <AdviserList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <AdviserCreate />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <AdviserEdit />,
            hide: true,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <AdviserList />,
            hide: true,
          },
        ],
      },
      {
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Productos",
        path: "/Productos",
        isList: true,
        element: <ProductList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <CreateProduct />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <CreateProduct />,
            hide: true,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <ProductList />,
            hide: true,
          },
        ],
      },
      {
        icon: <InboxArrowDownIcon {...icon} />,
        name: "Ordenes",
        path: "/Ordenes",
        isList: true,
        element: <OrderList />,
        subpages: [
          {
            icon: <PencilSquareIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <EditOrder />,
            hide: true
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <OrderList />,
            hide: true,
          }
        ]
      }
    ]
  }
];

export default routes;
