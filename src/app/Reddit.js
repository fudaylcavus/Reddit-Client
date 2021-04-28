const URL = 'https://www.reddit.com/';

const Reddit = {
    getSubredditPosts: async (subreddit) => {
        const response = await fetch(`${URL}${subreddit}.json`);
        const json = await response.json();

        return json.data.children.map((post) => post.data);
    },
    getSubreddits: async () => {
        const response = await fetch(`${URL}subreddits.json`);
        const json = await response.json();

        return json.data.children.map((subreddit) => subreddit.data);

    },
    getPostComments: async (permalink) => {
        const response = await fetch(`${URL}${permalink}.json`);
        const json = await response.json();
        console.log(json)

        return json[1].data.children.map((subreddit) => subreddit.data);
    }
}

export default Reddit