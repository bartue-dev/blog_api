//helper, to hanldle how many child comment include in getAllPost query
function includeComment(levels) {
  let query = { childComment: true };

  for (let i = 1; i < levels; i++) {
    query = { childComment: {include: query} }
  }

  return query
}

module.exports = {
  includeComment
}