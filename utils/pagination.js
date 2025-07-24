function paginate(req, totalCount) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const result = { limit, offset };
  if (typeof totalCount === 'number') {
    result.currentPage = page;
    result.totalPages = Math.ceil(totalCount / limit);
  }
  return result;
}

module.exports = paginate;
