# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP ec2-54-183-83-77.us-west-1.compute.amazonaws.com
2. SSH username ubuntu
3. SSH password or key.
    <br> If a ssh key is used please upload the key to the credentials folder.
    in the credentials folder key.pem
    to connect to EC2 instance ssh -i credentials/key.pem ec2-54-183-83-77.us-west-1.compute.amazonaws.com
4. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username postgres
6. Database password team0303
7. Database name (basically the name that contains all your tables)
    recipe-03
8. Clear instructions with examples on how to use all the above information.
    
    To access from the web server
    From the project directory 
    cd credentials
    ch mod 400 key.pem
    ssh -i credentials/key.pem ec2-54-183-83-77.us-west-1.compute.amazonaws.com

    To access the database, download pgadmin4
    Set up a new server
    Name: recipes-03
    Username: postgres 
    Port: 5432
    Password:team0303

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file. 