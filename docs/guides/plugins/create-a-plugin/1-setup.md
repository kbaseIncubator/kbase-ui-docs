# Step 1. Set up kbase-ui work environment

Read the [prerequisites](prerequisites.md) guide to ensure your host machine is up to snuff.

## macOS

1. A kbase-ui project requires a dedicated directory, into which you will clone the repos you are working with. Go ahead and create this folder, which we'll refer to in this document as `project`.

2. First, you need to ensure that you have a fork of kbase-ui at github.

3. Open a terminal into this folder, either the built-in _Terminal_ program, _iTerm_, or your terminal app of choice.

4. Clone the _kbase/kbase-ui_ repo into this folder:

   ```bash
   git clone -b feature-refactor-to-crats https://github.com/{YOUR_ACCOUNT}/kbase-ui
   ```

   where `{YOUR_ACCOUNT}` is your personal github account to which you have forked the upstream https://github.com/kbase/kbase-ui. Of course, if you prefer to work with ssh authorization, use that form instead:

   ```bash
   git clone -b develop ssh://git@github.com/{YOUR_ACCOUNT}/kbase-ui
   ```

   > During June 2019 the correct branch is actually `refactor-to-crats`, the feature branch we are actively developing to support this architecture.

5. Create and launch the kbase-ui image:

   ```bash
   cd kbase-ui
   make dev-start
   ```

6. Since that container is now running in the terminal, you'll need to open a new terminal window for the next steps. [^1]

7. Point _ci.kbase.us_ to your local computer:

   Edit

   ```bash
   sudo vi /etc/hosts
   ```

   adding the line

   ```bash
   127.0.0.1	ci.kbase.us
   ```

   at the end of the file, then save it `[Shift][Z][Z]`

   > Why? There have been complaints about this. However, it is a small task, and provides some advantage in being able to seamlessly develop and test against all kbase environments (ci, next, appdev, prod, etc.) Also, some ui code determines the correct full url based on the browser window current location.

8. Open a browser, in private browsing mode, to [https://ci.kbase.us](https://ci.kbase.us).

9. Since the proxy uses a _self-signed certificate_ to support https, your browser will likely complain. Just suffer through the prompts to allow the connection to proceed.[^2]

   > If you tire of the self-signed cert dance, you may want to try using a [local kbase cert](../../development/local-kbase-cert)

10. You should now see kbase-ui 😊

11. When done, you can simply press `[Control][C]` in the original terminal window to stop the containers.[^3]

    1. If you won't be conducting further builds for this instance, you'll want to clear out the intermediate build image:[^4]

       ```bash
       make dev-clean
       ```

## Next Step

[Step 2. Create Plugin Repos](./2-create-repos)

\---

[^1]: If you use Terminal or iTerm, pressing `[Cmd][T]` will open a new tab in the terminal window, with the same directory.
[^2]: If your browser hangs when attempting to connect, you should have better luck using the private mode of your browser. Both Safari and Chrome work fine in private mode with self-signed certs, Firefox will still hang.
[^3]: Currently docker-compose does not always clean up after itself when using `[Control][C]` to stop it; see [this github issue](https://github.com/docker/compose/issues/3317).
[^4]: This also removes the Docker network "kbase-dev" created during image-building process.
