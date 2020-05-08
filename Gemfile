# SOURCES
# standard source for rubygems packages
source "https://rubygems.org"

# safe work-around for Bundler bug with GitHub repo source
# Bundler will attempt to download gems declared as:
#
#	"gem 'foo', :GitHub => 'foo'
#
# from https://github.com/foo/foo.git, and gems declared as:
#
# 	"gem 'foo_bar', :github => 'foo/bar'
#
# from https://github.com/foo/bar.git
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end
# ========================================


# PLUGINS
# alternate jekyll gem or using GitHub Pages
gem "github-pages", "~> 204", group: :jekyll_plugins

# basic plugins
group :noupdate do
  gem "ffi", "= 1.12.2"
  gem "nokogiri", "= 1.10.9"
end

# jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-sitemap", "~> 1.2"
  gem "jekyll-seo-tag", "~> 2.5"

end
# ========================================


# WINDOWS-SPECIFIC-STUFF
# (Windows does not include zoneinfo files, so bundle the tzinfo-data gem)
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# (Performance-booster for watching directories on Windows)
gem "wdm", "~> 0.1.0" if Gem.win_platform?

