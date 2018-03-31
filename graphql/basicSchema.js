import {
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType
} from "graphql";

var keystoneTypes = require("./keystoneTypes");

var keystone = require("keystone");
var Competition = keystone.list("Competition");
var Talk = keystone.list("Talk");
var User = keystone.list("User");
var RSVP = keystone.list("RSVP");
var Organisation = keystone.list("Organisation");
var Startup = keystone.list("Startup");

function getCompetition(id) {
  if (id === "next") {
    return Competition.model
      .findOne()
      .sort("-startDate")
      .where("state", "active")
      .exec();
  } else if (id === "last") {
    return Competition.model
      .findOne()
      .sort("-startDate")
      .where("state", "past")
      .exec();
  } else {
    return Competition.model.findById(id).exec();
  }
}

var competitionStateEnum = new GraphQLEnumType({
  name: "CompetitionState",
  description: "The state of the competition",
  values: {
    draft: { description: "No published date, it's a draft competition" },
    scheduled: {
      description: "Publish date is before today, it's a scheduled competition"
    },
    active: {
      description: "Publish date is after today, it's an active competition"
    },
    past: {
      description:
        "Competition date plus one day is after today, it's a past competition"
    }
  }
});

var competitionType = new GraphQLObjectType({
  name: "Competition",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the competition."
    },
    publishedDate: keystoneTypes.date(Competition.fields.publishedDate),
    state: { type: new GraphQLNonNull(competitionStateEnum) },
    startDate: keystoneTypes.datetime(Competition.fields.startDate),
    endDate: keystoneTypes.datetime(Competition.fields.endDate),
    place: { type: GraphQLString },
    map: { type: GraphQLString },
    description: { type: GraphQLString },
    maxRSVPs: { type: new GraphQLNonNull(GraphQLInt) },
    totalRSVPs: { type: new GraphQLNonNull(GraphQLInt) },
    url: { type: GraphQLString },
    remainingRSVPs: { type: new GraphQLNonNull(GraphQLInt) },
    rsvpsAvailable: { type: new GraphQLNonNull(GraphQLBoolean) },
    talks: {
      type: new GraphQLList(talkType),
      resolve: (source, args) =>
        Talk.model
          .find()
          .where("competition", source.id)
          .exec()
    },
    rsvps: {
      type: new GraphQLList(rsvpType),
      resolve: (source, args) =>
        RSVP.model
          .find()
          .where("competition", source.id)
          .exec()
    }
  })
});

var talkType = new GraphQLObjectType({
  name: "Talk",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The title of the talk."
    },
    isLightningTalk: {
      type: GraphQLBoolean,
      description: "Whether the talk is a Lightning talk"
    },
    competition: {
      type: competitionType,
      description: "The Competition the talk is scheduled for",
      resolve: (source, args, info) =>
        Competition.model.findById(source.competition).exec()
    },
    who: {
      type: new GraphQLList(userType),
      description: "A list of at least one User running the talk",
      resolve: (source, args, info) =>
        User.model
          .find()
          .where("_id")
          .in(source.who)
          .exec()
    },
    description: { type: GraphQLString },
    slides: {
      type: keystoneTypes.link,
      resolve: source => ({
        raw: source.slides,
        format: source._.slides.format
      })
    },
    link: {
      type: keystoneTypes.link,
      resolve: source => ({
        raw: source.link,
        format: source._.link.format
      })
    }
  })
});

var userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(keystoneTypes.name) },
    photo: { type: keystoneTypes.cloudinaryImage },
    startup: {
      type: new GraphQLList(startupType),
      resolve: (user, args) =>
        Startup.model
          .find()
          .where("members", args.id)
          .exec()
    },
    // email: {
    // 	type: keystoneTypes.email,
    // 	resolve: (source) => ({
    // 		email: source.email,
    // 		gravatarUrl: source._.email.gravatarUrl,
    // 	}),
    // },
    talks: {
      type: new GraphQLList(talkType),
      resolve: (source, args) =>
        Talk.model
          .find()
          .where("who", source.id)
          .exec()
    },
    rsvps: {
      type: new GraphQLList(rsvpType),
      resolve: (source, args) =>
        RSVP.model
          .find()
          .where("who", source.id)
          .exec()
    }
  })
});

var rsvpType = new GraphQLObjectType({
  name: "RSVP",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    competition: {
      type: competitionType,
      resolve: source => Competition.model.findById(source.competition).exec()
    },
    who: {
      type: userType,
      resolve: source => User.model.findById(source.who).exec()
    },
    attending: { type: GraphQLBoolean },
    createdAt: keystoneTypes.datetime(Competition.fields.createdAt),
    changedAt: keystoneTypes.datetime(Competition.fields.changedAt)
  }
});

var organisationType = new GraphQLObjectType({
  name: "Organisation",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    logo: { type: keystoneTypes.cloudinaryImage },
    website: { type: GraphQLString },
    isHiring: { type: GraphQLBoolean },
    description: { type: keystoneTypes.markdown },
    location: { type: keystoneTypes.location },
    members: {
      type: new GraphQLList(userType),
      resolve: (source, args) =>
        User.model
          .find()
          .where("organisation", source.id)
          .exec()
    }
  })
});

var startupType = new GraphQLObjectType({
  name: "Startup",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    logo: { type: keystoneTypes.cloudinaryImage },
    website: { type: GraphQLString },
    isHiring: { type: GraphQLBoolean },
    description: { type: keystoneTypes.markdown },
    location: { type: keystoneTypes.location },
    members: {
      type: new GraphQLList(userType),
      resolve: (source, args) =>
        User.model
          .find()
          .where("startup", source.id)
          .exec()
    }
  })
});

var queryRootType = new GraphQLObjectType({
  name: "Query",
  fields: {
    competitions: {
      type: new GraphQLList(competitionType),
      resolve: (_, args) => Competition.model.find().exec()
    },
    competition: {
      type: competitionType,
      args: {
        id: {
          description: 'id of the competition, can be "next" or "last"',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => getCompetition(args.id)
    },
    talks: {
      type: new GraphQLList(talkType),
      resolve: (_, args) => Talk.model.find().exec()
    },
    talk: {
      type: talkType,
      args: {
        id: {
          description: "id of the talk",
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => Talk.model.findById(args.id).exec()
    },
    organisation: {
      type: organisationType,
      args: {
        id: {
          description: "id of the organisation",
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => Organisation.model.findById(args.id).exec()
    },
    startup: {
      type: startupType,
      args: {
        id: {
          description: "id of the startup",
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => Startup.model.findById(args.id).exec()
    },
    startups: {
      type: new GraphQLList(startupType),
      resolve: (_, args) => Startup.model.find().exec()
    },
    users: {
      type: new GraphQLList(userType),
      resolve: (_, args) => User.model.find().exec()
    },
    user: {
      type: userType,
      args: {
        id: {
          description: "id of the user",
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => User.model.findById(args.id).exec()
    },
    rsvp: {
      type: rsvpType,
      args: {
        id: {
          description: "id of the RSVP",
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => RSVP.model.findById(args.id).exec()
    }
  }
});

export default new GraphQLSchema({
  query: queryRootType
});
