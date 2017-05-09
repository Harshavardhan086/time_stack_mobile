raw_config = File.read(Rails.root + "config/local_env.yml")
Rails.logger.debug "\n\n#raw_config = #{raw_config}\n"
CONFIG = YAML.load(raw_config)