export default async function pageQuery({
  model,
  pageNo = 1,
  pageSize = 10,
  queryParams = {},
  returnFields = {},
  sortParams = {},
  populateParams = ''
} = {}) {
  if (!model) {
    return {};
  }
  const no = pageNo && Number.isInteger(+pageNo) && pageNo > 0 ? +pageNo : 1;
  const size =
    pageSize && Number.isInteger(+pageSize) && pageSize > 0 ? +pageSize : 10;
  const total = await model.count(queryParams);
  const result = await model
    .find(queryParams, returnFields)
    .skip((no - 1) * size)
    .limit(size)
    .populate(populateParams)
    .sort(sortParams);

  return {
    result: result,
    current: no,
    size: size,
    total: total
  };
}
