# Maxwell Dausch's Example Cydia Repository

This is a shell template for creating your own Cydia repository so you can host your own tweaks and themes

The layout of this repo is very similar to the version I have running on my own repo, [mdaus.ch/repo](www.mdaus.ch/repo)
I have uploaded a copy of this example repository to [mdausch.github.com](mdausch.github.com) if you want to test it out there as well, but I promise you as of right now at least, its going to look very similar to my main repo.

## Prerequisites
You will need a Mac or Linux system to create the repo on. This is possible using Windows, but is more tedious, and I will not be getting into it right now, this may be added later on though.


### If you are using a Mac, you will need:
* [Homebrew](brew.sh) - This is a package manager for Mac. If you don't have this already, paste the line below into your terminal:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

*  DPKG - This is the software that is used to package our tweaks and themes into a Debian package, which are the files Cydia downloads and installs from repositories. You can install it by running the following command:
```
brew install dpkg
```

* Perl  - This is a programming language that we will need for running one of the scripts later on to generate our repo. You can install it by running the following command:
```
brew install perl
```

* md5sum - This is a command to generate the md5 hash of our packages. This is so we can verify the files are unchanged and that we are downloading the right files from Cydia. You can install it by running the following command:
```
brew install md5sha1sum
```

* git - This is a version control system that tracks changes to files. This is only necessary if you plan to use Github for hosting your repository. You can install it by running the following command:
```
git
```
If you don't have git installed already, you will be prompted to install the command line tools.


### If you are using Linux, you may need:

* git - This is a version control system that tracks changes to files. This is only necessary if you plan to use Github for hosting your repository. You can install it by running the following command in your terminal:
```
sudo apt-get install git
```

## Getting the Example repo:
Download the repo as a .zip file from [here](https://github.com/MDausch/Example-Cydia-Repository/archive/master.zip) and extract that to wherever you want to work from

## Repo Configuration

Now that you have everything installed, you can begin setting up your repo's configuration files. First things first, crack open the release file. This file is what tells people who the repository belongs to, and allows you to change its display name in Cydia

When you open up this file it will look like

```
Origin: Your Repo’s Name
Label: Your Repository’s label that shows on a tweaks package page
Suite: stable
Version: 1.0
Codename: cydia-ios
Architectures: iphoneos-arm
Components: main
Description:  The name that shows on Cydia
```

Here you can change the origin, label, and description pages to whatever you want Cydia to display


## Setting up Github Pages To Host Your Repo

If you plan to host your repository using GitHub pages, you will need to have a GitHub account made. Don't worry, I'll wait right here while you make one now.

Now use the "+" icon on the top of the page to create a new repository. When it prompts you to, name it
```
[Your Username].github.io
```
This will be where your website lives.

Now you need to add the repo files to be hosted on GitHub. In order to do this, navigate to the folder holding all your repo files in your terminal. Now you will need to run
```
git init
git remote add origin https://github.com/[your github username]/[your github username].github.com.git
git add --all
git commit -m "Initial Upload"
git push origin master
```

Now you should be able to navigate to [Your Username Here].github.io and you will be taken to your new Repo!

Be sure to update the index.html with the link to your new repo, and customize the page however you want.

## Package Configuration

Now that we have the shell of your repo set up, it is time to get to the meat of the whole project, the packages.

Lets dive right into some more configuration files. Here we have a control file. This is what tells Cydia things like: who made a package, where to find its depiction page, and the package version.

Below is the control file from the example tweak I have provided in this repo

```
Package: com.mdausch.exampletweak
Name: ExampleTweak
Depends: mobilesubstrate
Version: 0.0.2
Architecture: iphoneos-arm
Description: An example package for testing out our personal Cydia repository
Depiction: https://mdausch.github.io/depictions/?p=com.mdausch.exampletweak
Maintainer: Maxwell Dausch <max.dausch@gmail.com>
Author: Maxwell Dausch <max.dausch@gmail.com>
Section: Tweaks
```

Lets break down each of these fields:

* **Package:** This is your tweaks bundle identifier. Bundle identifiers are usually written out in reverse DNS notation (I.e com.myCompany.myTweak). Take my main repo's bundle identifier for example `ch.mdaus.exampletweak` My domain name is [mdaus.ch](www.mdaus.ch) so when we reverse that we have ch.mdaus and then we just add on what we want our the package to be identified as.
* **Name:** This is just the name of our package. This is the what Cydia displays as the package name when you go to download it.
* **Version:** This is simply the version number. This is how your users will know if there is an update for your package. If a user has version 1.0 installed, and your repo has version 1.0.1 being hosted, Cydia will show them that an update is available.
* **Architecture:** You should NOT change this from `iphoneos-arm` This is the type of our package
* **Description:** This is just a short description of the package.
* **Depiction:** This is the link to a custom depiction page for the package. This is how people add screenshots and custom styling to the descriptions of packages in Cydia. If you provide a link here, the "Description" field in the control file is no longer displayed
* **Maintainer:** This is the person who built the package. Issues with the packaging of the software should be sent to them. You can add their email by placing it in these brackets `<>`  For example `<max.dausch@gmail.com>` would show up in Cydia as the maintainer for my packages, allowing users to send issues over email.
* **Author:** This is the person who originally wrote the software. This is who should be contacted about bugs in the tweak or theme itself. You can add their email similarly to the maintainer field with these brackets `<>`
* **Section:**  This is where your package will be displayed in Cydia. `Tweaks` will be placed in the tweaks category. `Games` will be placed in the games category. Feel free to make your own category for your repo if you want to

Other fields you may want to add:

* **Depends:** Use this field to add the bundle id for any dependencies you may need with your package. Such dependencies may include mobilesubstrate for tweaks or anemone for theming

* **Conflicts:** Use this field to add any known tweak's bundle ids that conflict with yours. Maybe you modify the lock screen, and another tweak does the same so springboard will always crash, this makes it so you cant have both installed at once.


* **Provides:** Use this field if your package provides the same functionality as another tweak. Take Anemone for example, it provides the functionality of Winterboard, so this tells themes that may have originally only depended on Winterboard that Anemone can be used instead and then allows the theme to be installed.

## Using The Depictions

Depictions are a nice way of adding a bit of flair to your packages page in Cydia. When using a depiction, you are replacing the description page with something a bit more fun, a link to some custom page that has all the info about your package that a user may ever want to know. To use the custom depiction page that I have provided with this repo, there are just a few steps you need to follow:

1. Navigate to the depictions folder in this repo
2. Create a copy of the ch.mdaus.exampletweak folder
3. Change the new folders name to be your package's Bundle ID
4. Open the info.xml file in a text editor of your choice and fill out the information as you see fit
5. open your packages control file and add the depiction link into the depiction field. If this field is not already there, add it in. The link will look like similar to this, but with your own URL:
```
http://mdaus.ch/repo/depictions/?p=ch.mdaus.exampletweak
```
the important thing to note is that after you have the path to the depictions folder set up, you need to add the
```
/?p=your.bundle.identifier
```
part. This is what tells the depiction page to parse the info.xml file, and fill out the depiction page with all the information we could ever need.

### Notes about what our depiction page currently provides

Currently, the depiction implementation that I have provided is pretty bare bones. The info.XML file will look similar to this:

```
<packageInfo>
    <bundleId>com.mdausch.exampletweak</bundleId>
    <name>Example Tweak</name>
    <version>0.0.2</version>
    <descriptions>
        <description>
            An example package for testing out our personal Cydia repository
        </description>
        <description>
            This is just a bit more detail about what the tweak does... nothing :)
        </description>
    </descriptions>
    <compatibility>
        <miniOS>11.0</miniOS>
        <maxiOS>11.1.2</maxiOS>
    </compatibility>
    <dependencies>
        <dependency>mobilesubstrate</dependency>
        <dependency>some other dependency</dependency>
    </dependencies>
    <changelog>
        <change>
            <changeVersion>V0.0.2 </changeVersion>
            <changeDescription>An important change</changeDescription>
            <changeDescription>Another important change</changeDescription>
        </change>
        <change>
            <changeVersion>V0.0.1</changeVersion>
            <changeDescription>Initial Release</changeDescription>
        </change>
    </changelog>
</packageInfo>
```
The important bits are as follows:

* **bundleId:** The bundle ID of the package
* **Name:** Your packages name
* **descriptions:** Write out what your package does here. You can have multiple description tags inside the `descriptions` tag. Each description tag creates a new paragraph inside the description box.
* **miniOS:** This displays the minimum version that your package should be installed on
* **maxiOS:** This displays the maximum version that your package should be installed on
* **dependency:** Add a new dependency tag for each dependency that your package requires
* **changelog:** This will be a list of all the changes your packages have gone through. To add a new change, create a `change` tag. In this tag, you will add a `changeVersion` tag to let users know which change you are writing about. Then after that tag, add a `changeDescription` tag listing what you have modified, added, or removed from the package. You can add as many of these descriptions as you want. They will automatically be styled as a list.


Use the provided example info.xml as a guide for how this should be formatted with your information.

### TODO functionality

Here are a few features I would like to add to the depiction page:

* [ ] Screenshots - Either inline or a separate page for screenshots for your package
* [ ] A Better ChangeLog - Cut down on the clutter and only show the most recent version's changes and then provide a link to another page with the full list of changes
* [ ] Version Checking - Parse the user agent and figure out if a user's device is compatible with the min and max versions specified


## Adding Tweaks

Remember to add your custom depiction link if you want one to the tweaks control file before you package it.

Once you have built the package with THEOS, you can then take the Debian Package that has been made for you and throw it into the Debs folder of the repo.

## Themes

Themes are a bit different to add to the repo, this is because they don't come set up with a control file, nor do they have a managing system like Theos to build it into a Debian package automatically for you. We have to do this ourselves.

To do this:

1. Create a folder with the name of your package.
2. Inside that folder, create another folder and name it `DEBIAN`
3. Inside the `DEBIAN` folder, open up the text editior of your choice and add the contents of a control file. Update the fields as you see fit. Remember to add your depiction link if you want a custom depiction to show in Cydia.
4. Be sure to save the control file without any extension
5. Now go back to the root project file. Make a folder called `Library`
6. Inside the Library folder, create another folder and name it  `Themes`
7. Add your [package].theme folder which holds your custom theme's contents into the `Themes` folder
8. In your terminal navigate to the folder holding the root package folder.
9. Type
```
dpkg-deb -b Package
```
where `Package` is the name of the folder you are compressing
10. Add the newly generated .deb file to the debs folder of your repo.

## Updating The Repo

Once all of your debs and depictions have been placed in the proper place it is time to update the repo. To do this run the UpdateRepo.sh file from inside your repo in the terminal by typing ./UpdateRepo.sh If this gives you some sort of permissions error, run
```
chmod +x UpdateRepo.sh && chmod +x dpkg-scanpackages
```
and try running the update script once again.

You will know if the script ran correctly if it gives an output similar to

```
** Packages in archive but missing from override file: **
ch.mdaus.exampletweak
Wrote 1 entries to output Packages file.
```

Now you can upload all of these files to your repo.

If you are using GitHub Pages to host your repository, navigate to the repo's folder in your terminal and type

```
git add --all
git commit -m "Uploaded New Packages"
git push origin master
```

This should then upload all of your packages to the repo, and you will then be able to download them from Cydia.


## Thats It!

Congratulations, you are now the proud owner of Cydia Repository. Thanks for following my tutorial. Feel free to contact me for any help, or just to say thanks.


