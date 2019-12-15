# KBase UI Docs

> Documentation which spans front end projects.

## Usage

HOW TO GET STARTED and USE IT

## Install

This documentation is designed to be accessed at its home on Github, located at (https://kbaseIncubator.github.io/kbase-ui-docs).

You can view it locally as well:

### macOS

Note that macOS ships with Ruby. However, since it is at the system level it may require root access to install gems. It should prompt you for your password (assuming you have admin access), but that doesn't always work. A good solution is documented here: https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation.

To cut to the chase:

```bash
export GEM_HOME=$HOME/.gem
export PATH=$GEM_HOME/bin:$PATH
```



## macOS 2

These instructions utilize a more robust Ruby workflow on macOS.

This uses `rbenv`, a simple tool which allows you to install multiple versions of Ruby. We like this, because it allows us to specify a given version of Ruby for which we know the instructions work.

```zsh
sudo port install rbenv ruby-build
```

Set up rbenv:

> See: [https://github.com/rbenv/rbenv](https://github.com/rbenv/rbenv)

```zsh
rbenv init
```

instructions will be printed for completing the rbenv integration. This is optional, and simply means that in future terminal sessions you don't need to enter `rbenv init` to enable rbenv within the terminal session.

E.g., in macOS Catalina:

```zsh
# Load rbenv automatically by appending
# the following to ~/.zshrc:

eval "$(rbenv init -)"
```

If you don't want rbenv to be set up in your shell init script, you can simply enter at the terminal:

```zsh
eval "$(rbenv init -)"
```

Note that this will only be effective for this specific Terminal session.

Check your setup:

```zsh
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

Install a version of ruby:

```zsh
rbenv install 2.6.5
```

If you want to use this ruby version permanently, 

```zsh
rbenv global 2.6.5
```

for this project

```zsh
rbenv local 2.6.5
```

for the shell session only

```zsh
rbenv local 2.6.5
```


Although `bundler` should be installed with Ruby with rbenv (I think, or maybe it is a remnant of a past install -- TODO: do a fresh rbenv install to verify), it is best to just install it from scratch:

```zsh
gem install bundler
```

install dependencies required by github pages:

```zsh
cd docs
bundle install
```

start the Jekyll server

```zsh
bundle exec jekyll serve
```

take your browser to http://localhost:4000.

#### Using rvm

Another tool for installing and managing multiple Rubys is `rvm`. Some consider it more complex than it needs to be, and it is more intrusive into your shell startup scripts, but it is simple to use.

Install rvm from https://rvm.io

##### Install rvm

This will install rvm into your own home directory.

```zsh
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable
```

##### Install ruby

```zsh
rvm install 2.6.5
```

This will take a while. It is possible that you'll need to install macOS developer tools like XCode, macports, or homebrew. I use macports, and the install does conduct a macports update.




- Open a terminal into this repo's top level directory
- install `bundler` version 2 if you don't already have it (it is a Ruby package.) 

  If you installed Ruby with rvm, bundler 1 will already been installed. It will be need to be updated:

    ```bash
    gem install bundler
    ```

    > Note that this and other Ruby related commands will probably ask you to authorize installation. This is because the packages (gems) are being installed at the system level. Just go ahead and authorize - do not try to run these commands with `sudo`, as they are designed to be run as a regular user and only prompt for authorization when they need to.

- install dependencies required by github pages:

    ``` bash
    cd docs
    bundle install
    ```

- start the Jekyll server

    ```bash
    bundle exec jekyll serve
    ```

- take your browser to https://localhost:4000.




## Background

HOW THIS FITS INTO KBASE

## Acknowledgments

- NAME - COMMENT

## See Also

- [KBase Github Pages Theme](https://github.com/kbase/kbase-github-pages-theme)

## License

SEE LICENSE IN LICENSE.md
