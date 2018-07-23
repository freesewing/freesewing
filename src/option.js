function option (config)
{
  this.id = config.id;
  this.config = config;
  this.val = config.val;

  return this;
}

export default option;
