export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-make-ui-ux-website-development",
    title: "How to Make UI/UX website // Frontend development",
    category: "Design Course",
    date: "10/23/2024",
  },
  {
    slug: "how-cook-emotional-site-web-development",
    title: "How to Cook an Emotional Site // Web Development",
    category: "Design Course",
    date: "10/21/2024",
  },
  {
    slug: "mouse-follower",
    title: "Mouse Follower",
    category: "Dev Source",
    date: "4/11/2022",
  },
];