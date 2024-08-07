import path from './path'
import icons from './icons'

export const navigation = [
    {
        id: 1,
        value: "HOME",
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: "PRODUCTS",
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: "BLOGS",
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: "OUR SERVICE",
        path: `/${path.OUR_SERVICE}`
    },
    {
        id: 5,
        value: "FAQs",
        path: `/${path.FAQ}`
    },
]

const {FaTruck, BsShieldShaded, BsFillReplyFill, FaTty, AiFillGift} = icons

export const productExtraInfoItem = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality Checked',
        icon: <BsShieldShaded />
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Products',
        icon: <FaTruck />
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        sub: 'Special Gift Cards',
        icon: <AiFillGift />
    },
    {
        id: 4,
        title: 'Free Return',
        sub: 'Within 7 Days',
        icon: <BsFillReplyFill />
    },
    {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: <FaTty />
    }   
]

export const productInfoTabs= [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: `Technology: GSM / HSPA / LTE
        Dimensions: 146 x 72 x 8.1 mm
        Weight: 161 g
        Display: IPS LCD 5.2 inches
        Resolution: 1080 x 1920
        OS: Android OS, v6.0.1 (Marshmallow)
        Chipset: Snapdragon 820
        CPU: Quad-core
        Internal: 32/64 GB
        Camera: 23 MP, f/2.0 - 13 MP, f/2.0`
    },
    {
        id: 2,
        name: 'WARRANTTY',
        content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.
        `
    },
    {
        id: 3,
        name: 'DELIVERY',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
        `
    },
    {
        id: 4,
        name: 'PAYMENT',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
        `
    }

]

export const colors = [
    'black',
    'brown',
    'gray',
    'white',
    'pink',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
]

export const adminSidebar = [

    {
        id: 1,
        type: 'single',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`
    },
    {
        id: 2,
        type: 'single',
        text: 'User Manangement',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`
    },
    {
        id: 3,
        type: 'parent',
        text: 'Product Management',
        submenu: [
            {
                text: 'Create Product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`
            },
            {
                text: 'Manage Products',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`
            }
        ]
        
    },
    {
        id: 4,
        type: 'single',
        text: 'Order Management',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`
    },
    {
        id: 5,
        type: 'parent',
        text: 'Blog Management',
        submenu: [
            {
                text: 'Create Blog',
                path: `/${path.ADMIN}/${path.CREATE_BLOG}`
            },
            {
                text: 'Manage Blogs',
                path: `/${path.ADMIN}/${path.MANAGE_BLOG}`
            }
        ]
        
    }

]
export const memberSidebar = [
    {
        id: 1,
        type: 'single',
        text: 'Personal',
        path: `/${path.MEMBER}/${path.PERSONAL}`
    },
    {
        id: 2,
        type: 'single',
        text: 'Buy History',
        path: `/${path.MEMBER}/${path.HISTORY}`
    },
    // {
    //     id: 3,
    //     type: 'single',
    //     text: 'Wishlist',
    //     path: `/${path.MEMBER}/${path.WISHLIST}`
    // },
]
export const roles = [
    {
        code: 'admin',
        value: 'admin'
    },
    {
        code: 'user',
        value: 'user'
    }
]

export const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    }
]

export const voteOptions = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Normal'
        
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    },
]