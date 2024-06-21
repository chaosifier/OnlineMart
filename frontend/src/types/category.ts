export type Category = {
    id: 0;
    title: string;
    slug: string;
    children: [Category];
};

export type CategoryDetail = Category & {
    attributes: [
        {
            id: 0;
            name: string;
            type: string;
            unit: string;
            attributes: [
                {
                    id: 0;
                    productAttribute: string;
                    value: string;
                }
            ];
        }
    ];
};
