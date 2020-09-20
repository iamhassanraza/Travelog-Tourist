const feed = [
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / RS 15,000',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'Nomads Adventure Service',
      id: 873,
      last_name: '',
      profile_pic_url:
        'data:image/jpeg;base64,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',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '10 Days / Rs 21,000',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '353',
        image_url:
          'https://cf.bstatic.com/images/hotel/max1280x900/183/183223496.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour to Sawat',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'Nomads Adventure',
      id: 873,
      last_name: '',
      profile_pic_url:
        'data:image/jpeg;base64,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',
    },
    view_count: 230,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '3 Days / Rs 12,000',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '403',
        image_url:
          'https://i.pinimg.com/originals/7b/1d/af/7b1daf8318909bd714c4ea7274f71332.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Gilgit Baltistan',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'Adventure Pakistan',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 90,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '15 Days / RS 45,000',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '463',
        image_url:"https://mir-s3-cdn-cf.behance.net/project_modules/disp/dae89668788993.5b6998ba37798.png",
        post_detail_title: 'No Title',
        post_id: 213,
        width: '340',
      },
    ],
    price: null,
    title: 'Pakistan Tour',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'Adventure Pakistan',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / Rs 20,000',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'IPhone organization',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / 300$',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'IPhone organization',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / 300$',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'IPhone organization',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / 300$',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'IPhone organization',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / 300$',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'IPhone organization',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
  {
    campuses: {description: 'NED University', id: 1},
    comments: [],
    created_at: '2020-09-07 13:49:04',
    description: 'fghj',
    id: 215,
    isFollowing: false,
    likes_count: 0,
    postCategory: {
      category_image:
        'https:/cgpostsprod.s3.amazonaws.com/2c2788b1-7d71-4b8b-91d6-34d840809e45/image-f794474d-45a1-4f8d-b801-18296866f65d.jpg',
      description: '5 Days / 300$',
      id: 12,
      rgba_colors: '138, 69, 250',
    },
    postDetail: [
      {
        height: '333',
        image_url:
          'https://cgpostsprod.s3.us-east-2.amazonaws.com/7d773086-111a-4ce5-9cda-d6bd0670f4f8/0DFF2D3A-635F-4D49-B3FB-247EF2062D6B.jpg',
        post_detail_title: 'No Title',
        post_id: 213,
        width: '500',
      },
    ],
    price: null,
    title: 'Tour To Hunza Village',
    updated_at: '2020-09-07 13:49:04',
    userSavedPost: [],
    userWiseLike: [],
    user_id: 873,
    users: {
      email: 'org5@yahoo.com',
      first_name: 'IPhone organization',
      id: 873,
      last_name: '',
      profile_pic_url:
        'https:/cgusersprod.s3.us-east-2.amazonaws.com/Organization-822-4b668194-644d-4703-845f-76f9064bed35/78010622-226B-4062-92D8-05FE6A838887.jpg',
    },
    view_count: 2,
  },
];

export default feed;
