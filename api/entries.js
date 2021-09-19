const axios = require('axios').default

module.exports = async (req, res) => {
  let url

  switch (req.query.view) {
    case "trend":
      url = "https://api-os-takumi.mihoyo.com/community/post/wapi/post/list?page_size=50&type=1"
      break;
    case "new":
      url = "https://api-os-takumi.mihoyo.com/community/post/wapi/post/list/new?page_size=50&type=1"
      break;
    default:
      url = "https://api-os-takumi.mihoyo.com/community/post/wapi/post/list?page_size=50&type=1"
      break;
  }

  if (req.query.offset) url += "&offset=" + req.query.offset
  const result = await axios.get(url, {
    headers: {
      'x-rpc-language': 'ja-jp',
      'x-rpc-client-type': '4'
    }
  })

  const data = result.data
  const articleList = data.data.list
  const lastId = data.data.last_id

  const filteredList = articleList.filter((e) => {
    return e.post.game_id == 2 && e.post.f_forum_id == 1 && e.post.lang == "ja-jp"
  })

  const parsedList = filteredList.map((e) => {
    return {
      title: e.post.subject,
      content: e.post.content.length < 100 ? e.post.content : e.post.content.substr(0, 100) + "...",
      images: e.image_list.map((e) => e.url).slice(0, 3),
      url: "https://www.hoyolab.com/article/" + e.post.post_id,
      userName: e.user.nickname,
      avatar: e.user.avatar_url,
      createdAt: e.post.created_at * 1000,
      viewNum: e.stat.view_num,
      replyNum: e.stat.reply_num,
      likeNum: e.stat.like_num,
      bookmarkNum: e.stat.bookmark_num,
    }
  })

  res.json({
    success: true,
    last_id: lastId,
    list: parsedList
  })
}